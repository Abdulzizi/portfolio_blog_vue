<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'

defineProps<{
    payment: {
        id: string
    }
}>()

function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="link" class="w-8 h-8 p-0 text-white border-white rounded-xl">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="bg-gray-800 text-white border border-gray-700 shadow-lg rounded-md">
            <DropdownMenuLabel class="text-gray-300">Actions</DropdownMenuLabel>
            <DropdownMenuItem @click="copy(payment.id)" class="hover:bg-gray-700">
                Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator class="bg-gray-700" />
            <DropdownMenuItem class="hover:bg-gray-700">View customer</DropdownMenuItem>
            <DropdownMenuItem class="hover:bg-gray-700">View payment details</DropdownMenuItem>
        </DropdownMenuContent>

    </DropdownMenu>
</template>