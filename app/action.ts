'use server'

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";


export async function addNote(formData: FormData) {
  const content = formData.get("content") as string;

  if (!content) return;

  await prisma.note.create({
    data: {
      content: content,
    },
  });

  revalidatePath("/");
}

export async function deleteNote(id: number) {
  await prisma.note.delete({
    where: { id },
  });
  
  revalidatePath("/");
}