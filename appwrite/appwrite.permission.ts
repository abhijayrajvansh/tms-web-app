// import { createAdminClient } from "@/appwrite/appwrite.config";
// import { UserModel } from '@/auth'

// export async function hasPermissionOnCollection(
//     user: UserModel,
//     databaseId: string,
//     collectionId: string,
//     permissionType: "read" | "create" | "update" | "delete"
// ): Promise<boolean> {
//     try {
//         const { databases } = await createAdminClient();
//         const collection = await databases.getCollection(databaseId, collectionId);

//         const userPermissions = [
//             `user:${user.$id}`,
//             `role:admin`,
//             ...(user.labels ?? []).map((label) => `role:${label}`),
//         ];

//         const permissionMap = {
//             read: collection.readPermissions,
//             create: collection.createPermissions,
//             update: collection.updatePermissions,
//             delete: collection.deletePermissions,
//         };

//         const permissions = permissionMap[permissionType] || [];

//         return permissions.some((p) => userPermissions.includes(p));
//     } catch (err) {
//         console.error("Permission check failed:", err);
//         return false;
//     }
// }
