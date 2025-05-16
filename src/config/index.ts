import {z} from 'zod'

const envVars = z.object ({
    VITE_DATABASE_URL: z.string().url()
});

envVars.parse(import.meta.env);

declare global{
namespace NodeJS{
    interface ProcessEnv extends z.infer<typeof envVars>{}
}
}