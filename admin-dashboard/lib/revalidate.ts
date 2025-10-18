import { revalidateTag, revalidatePath } from "next/cache";
import { TAGS } from "@shared/constants";

export function revalidatePortfolio() {
  revalidateTag(TAGS.portfolio);
  revalidatePath("/", "layout");
}

export async function triggerFrontendRevalidation() {
  try {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
    await fetch(`${frontendUrl}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag: TAGS.portfolio }),
    });
  } catch (error) {
    console.error("Failed to trigger frontend revalidation:", error);
  }
}
