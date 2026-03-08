const User =require('./User')
const Role = require('./Role')
const Permission = require('./Permission')
const RolePermission = require('./RolePermission')
const UserRole = require('./UserRole')

User.belongsToMany(Role,{through:UserRole, foreignKey:'user_id'})
Role.belongsToMany(User,{through:UserRole,foreignKey:'role_id'})

Role.belongsToMany(Permission,{through:RolePermission,foreignKey:'role_id'})
Permission.belongsToMany(Role,{through:RolePermission,foreignKey:'permission_id'})