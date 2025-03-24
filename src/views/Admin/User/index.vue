<template>
    <AdminMain title="User Management">

        <!-- Add User Form -->
        <!-- <div class="mb-6 flex gap-2">
            <input v-model="newUser.name" placeholder="Enter name" class="p-2 border rounded bg-gray-800 text-white">
            <select v-model="newUser.role" class="p-2 border rounded bg-gray-800 text-white">
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
            </select>
            <button @click="addUser" class="px-4 py-2 bg-blue-600 rounded">Add User</button>
        </div>

        
        <table class="w-full border border-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th class="p-2 border border-gray-700">Name</th>
                    <th class="p-2 border border-gray-700">Role</th>
                    <th class="p-2 border border-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index" class="text-center">
                    <td class="p-2 border border-gray-700">{{ user.name }}</td>
                    <td class="p-2 border border-gray-700">
                        <select v-model="user.role" @change="updateRole(index)" class="p-1 bg-gray-800 text-white">
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="User">User</option>
                        </select>
                    </td>
                    <td class="p-2 border border-gray-700">
                        <button @click="deleteUser(index)" class="px-3 py-1 bg-red-600 rounded">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table> -->

        <div class="container py-10 mx-auto">
            <DataTable :columns="columns" :data="data" />
        </div>
    </AdminMain>
</template>

<script setup lang="ts">
import AdminMain from '@/layouts/AdminMain.vue';
import { Payment, columns } from '@/components/payment/column'
import { onMounted, ref } from 'vue'
import DataTable from '@/components/payment/data-table.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
        {
            id: 'd4c5a51a',
            amount: 500,
            status: 'success',
            email: 'j@example.com',
        },
        {
            id: '5c9a5f4b',
            amount: 200,
            status: 'failed',
            email: 'a@example.com',
        },
        {
            id: '9a9b0f8b',
            amount: 300,
            status: 'pending',
            email: 'm@example.com',
        },
        {
            id: '7f1a4f12',
            amount: 400,
            status: 'success',
            email: 'j@example.com',
        },
    ]
}

// Test data table

// Hardcoded user list
// const users = ref([
//     { name: "John Doe", role: "Admin" },
//     { name: "Jane Smith", role: "Editor" },
//     { name: "Mike Johnson", role: "User" }
// ]);

// // New user input
// const newUser = ref({ name: "", role: "User" });

// // Add new user
// const addUser = () => {
//     if (newUser.value.name.trim()) {
//         users.value.push({ ...newUser.value });
//         newUser.value.name = "";
//         newUser.value.role = "User";
//     }
// };

// // Update user role
// const updateRole = (index) => {
//     console.log(`Updated ${users.value[index].name} role to ${users.value[index].role}`);
// };

// // Delete user
// const deleteUser = (index) => {
//     users.value.splice(index, 1);
// };

onMounted(async () => {
    data.value = await getData()
})

</script>
