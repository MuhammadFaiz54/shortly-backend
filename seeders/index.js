const Role = require('../models/Role')
const Permission = require('../models/Permission')
const RolePermission = require('../models/RolePermission')
const User = require('../models/User')
const UserRole = require('../models/UserRole')
const bcrypt = require('bcryptjs')

const seedDataBase = async () => {
    await Role.bulkCreate([
        { id: 1, name: 'Super Admin' },
        { id: 2, name: 'Admin' },
        { id: 3, name: 'Manager' },
        { id: 4, name: 'User' }
    ], { ignoreDuplicates: true })

    await Permission.bulkCreate([
        { id: 1, name: 'create_url' },
        { id: 2, name: 'delete_url' },
        { id: 3, name: 'view_all_urls' },
        { id: 4, name: 'delete_user' },
        { id: 5, name: 'assign_role' },
    ], { ignoreDuplicates: true })

    await RolePermission.bulkCreate([
        // Super Admin
        { role_id: 1, permission_id: 1 },
        { role_id: 1, permission_id: 2 },
        { role_id: 1, permission_id: 3 },
        { role_id: 1, permission_id: 4 },
        { role_id: 1, permission_id: 5 },
        // Admin
        { role_id: 2, permission_id: 1 },
        { role_id: 2, permission_id: 2 },
        { role_id: 2, permission_id: 3 },
        // Manager
        { role_id: 3, permission_id: 1 },
        { role_id: 3, permission_id: 3 },
        // User
        { role_id: 4, permission_id: 1 },
        { role_id: 4, permission_id: 4 },

    ])

    const hashPass = await bcrypt.hash('superadmin123', 10)
    const superAdmin = await User.findOrCreate({
        where: { email: 'superadmin@gmail.com' },
        defaults: {
            name: 'SuperAdmin',
            email: 'superadmin@gmail.com',
            password: hashPass
        }
    })
    await UserRole.findOrCreate({
        where: { user_id: superAdmin[0].id, role_id: 1 }
    })
    console.log('Database seeded! ✅')
}

module.exports = seedDataBase