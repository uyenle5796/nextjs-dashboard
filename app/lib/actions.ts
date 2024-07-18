"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* Server Actions - async functions executed on the server, using 'use server' directive
    Protect against web attacks, secure data and ensure authorized access
    Can be called in both Client and Server components
    Progressive enhancement: allow users to interact with the form and submit data even if JavaScript hasn't been loaded or fails to load
    Deeply intergrated with NextJS caching - revalidate the associated cache using APIs like revalidatePath() and revalidateTag()

   See: Chapter 12 - Mutating Data using Server Actions https://nextjs.org/learn/dashboard-app/mutating-data
*/

// validate form data types
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  // safeParse() will return an object containing either a success or error field. This will help handle validation more gracefully without having put this logic inside the try/catch block.

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create invoice due to missing fields",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // insert data to database
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    return {
      message: `Successfully created invoice ${id}`,
    };
  } catch (error) {
    return {
      message: `Database Error: Failed to create invoice with error ${error}`,
    };
  }
  revalidatePath("/dashboard/invoices"); // clear cache and trigger a new request to the server to always get fresh data
  redirect("/dashboard/invoices"); // redirect user back to /dashboard/invoices
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update invoice due to missing fields",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    return {
      message: `Successfully updated invoice ${id}`,
    };
  } catch (error) {
    return {
      message: `Database Error: Failed to update invoice with error ${error}`,
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  //   throw new Error("Failed to Delete Invoice"); // TEMP - to test error.tsx working only!

  try {
    await sql`DELETE FROM invoices WHERE id=${id}`;
    revalidatePath("/dashboard/invoices");
    return {
      message: `Successfully deleted invoice ${id}`,
    };
  } catch (error) {
    return {
      message: `Database Error: Failed to delete invoice with error ${error}`,
    };
  }
}
