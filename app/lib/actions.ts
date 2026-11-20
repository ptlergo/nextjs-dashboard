'use server';

import { z } from 'zod';

// Define the schema for the form data. force amount to be a number incase of string.
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

// Create a new schema for creating an invoice by omitting the id and date fields from the original schema.
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    // Validate the form data against the schema. This will throw an error if the data is invalid.
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // Convert amount to cents
    const amountInCents = amount * 100; 
    const date = new Date().toISOString().split('T')[0];


}