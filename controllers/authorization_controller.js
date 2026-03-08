const { validationResult } = require('express-validator')
const User = require('../models/User')
const UserRole = require('../models/UserRole')
const RolePermission = require('../models/RolePermission')
const authorizationF = async (req, res) => {
    try {
        const checkVlaidation = validationResult(req)
        if (!checkVlaidation.isEmpty()) {
            return res.status(400).json({ errors: checkVlaidation.array() })
        }
        const roleAssignPerId = req.user?.id
        const { user_id, role_id } = req.body
        const roleAssignUser = await UserRole.findAll({ where: { user_id: roleAssignPerId } })
        const multiRoleforAssigner = roleAssignUser.map(v => v.role_id)
        console.log("multiRoleforOneUser===", multiRoleforAssigner);

        const rolePermission = await RolePermission.findAll({
            where: {
                role_id: multiRoleforAssigner
            }
        })
        const multiPermissionforAssigner = rolePermission.map(v => v.permission_id)
        console.log("multiPermissionforAssigner===", multiPermissionforAssigner);
        const assignRolePermissionTarget = await RolePermission.findAll({ where: { role_id: role_id } })
        const assignRolePermissionTargetArr = assignRolePermissionTarget.map(v => v.permission_id)
        const canAccessAllMatch = assignRolePermissionTargetArr.every(permission_id => multiPermissionforAssigner.includes(permission_id))
        console.log("canAccessAllMatch===", canAccessAllMatch);
        if (!canAccessAllMatch) {
            return res.status(403).json({
                message: "Tum ye role nahi de sakte!"
            })
        }
        await UserRole.findOrCreate({
            where: {
                user_id: user_id,
                role_id: role_id
            }
        })
        return res.status(200).json({
            message: "Role Assign Successfully "
        })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = authorizationF