import z from "zod";

export const createUserSchema = z.object({
    fullname: z.string().min(3, "fullname minimal 3 karakter"),
    username: z
    .string()
    .min(3, "fullname minimal 3 karakter")
    .refine((s) => !s.includes(" "), "Username tidak boleh mengandung spasi"),
    email: z.email("email ini tidak valid"),
    password: z.string().min(6, "password minimal 6 karakter"),
    role: z.enum(["admin", "user"], "role harus 'admin' atau 'user'"),
});

export const updateUserSchema = z.object({
    fullname: z.string().min(3, "fullname minimal 3 karakter").optional(),
    username: z
    .string()
    .min(3, "username minimal 3 karakter")
    .refine((s) => !s.includes(" "), "username tidak boleh mengandung spasi")
    .optional(),
    email: z.email("email ini tidak valid").optional,
    password: z.string() .min(6, "password minimal 6 karakter").optional(),
    role: z
    .enum(["admin", "user"], {
        message: "role harus 'admin' atau 'user'",
    })
    .optional(),
    address: z.string().min(5, "alamat minimal 5 karakter").optional(),
    phone_number: z
    .string()
    .regex(/^\d{9,14}$/, "nomor HP ini tidak valid")
    .optional(),
    age: z
    .number({ invalid_type_error: "umur harus angka" })
    .min(10, "umur maksimal 10 tahun")
    .max(100, "umur maksima; 100 tahun")
    .optional()
})