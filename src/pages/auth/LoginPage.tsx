import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import authService from "@/services/authService"


function LoginPage({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { mutate, isPending: pending } = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) =>
            await authService.login(email, password),
        onSuccess: () => {
            toast.success("Login successful")
            navigate("/dashboard")
        },
        onError: (e: Error) => {
            toast.error(e.message || "Login error")
        }
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        mutate({ email, password })
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
                Enter your email below to login to your account
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                </Field>
                <Field>
                    <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </a>
                    </div>
                    <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                </Field>
                <Field>
                    <Button type="submit" disabled={pending}>{pending ? "Logging in..." : "Login"}</Button>
                    <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="/signup">Sign up</a>
                    </FieldDescription>
                </Field>
                </FieldGroup>
            </form>
            </CardContent>
        </Card>
        </div>
    )
}

export default LoginPage;