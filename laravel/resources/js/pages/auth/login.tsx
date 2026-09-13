import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { props } = usePage();

    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
    }, [props.flash]);

    return (
        <AuthLayout
            title="Selamat Datang"
            description="Silahkan Masuk ke Akun Anda"
        >
            <Head title="Masuk" />

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6 md:pb-15"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className='dark:text-background'>Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className={`dark:placeholder:text-muted-foreground dark:text-background
                                    ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className='dark:text-background' >Katasandi</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Masukkan katasandi Anda"
                                    className='dark:placehoder:text-muted-foreground dark:text-background'
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember" className='dark:text-background'>Ingat saya</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm dark:text-muted-foreground dark:hover:text-background"
                                            tabIndex={5}
                                        >
                                            Lupa katasandi?
                                        </TextLink>
                                    )}
                            </div>

                            <Button
                                type="submit"
                                className="p-5 w-full cursor-pointer bg-primary hover:bg-primary/90 dark:bg-emerald-800 dark:text-accent-foreground dark:hover:bg-emerald-800/90"
                                tabIndex={4}
                                variant={'default'}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Masuk
                            </Button>
                        </div>


                        <div className="text-center text-sm text-muted-foreground">
                            Belum memiliki akun?{' '}
                            <TextLink href={register()} tabIndex={5} className='font-bold dark:text-background'>
                                DAFTAR DISINI
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
