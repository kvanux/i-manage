'use server'

import { revalidatePath } from 'next/cache'

export async function reload(route: string) {
    revalidatePath(route);
    return;
}
