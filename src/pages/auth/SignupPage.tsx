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
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import authService from "@/services/authService"

export function SignupPage({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [searchParams] = useSearchParams()
    const initialToken = searchParams.get("token") || ""

    // States
    const [token, setToken] = useState(initialToken)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()
    const { mutate, isPending: pending } = useMutation({
        mutationFn: async (values: { token: string; email: string; password: string }) => {
            await authService.signup(values.email, values.password, values.token)
        },
        onSuccess: () => {
            toast.success("Account linked successfully.")
            navigate("/login")
        },
        onError: (e: Error) => {
            toast.error(e.message || "Error linking account")
        }
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!token || !email || !password || !confirm) {
            toast.error("Please fill in all fields")
            return
        }
        if (password !== confirm) {
            toast.error("Passwords do not match")
            return
        }
        mutate({ token, email, password })
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Link your Telegram account</CardTitle>
                    <CardDescription>
                        Enter your code below to link your Telegram account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="telegram-code">Telegram code</FieldLabel>
                            <Input
                                id="telegram-code"
                                type="text"
                                placeholder="123456"
                                value={token}
                                onChange={e => setToken(e.target.value)}
                                required
                                disabled={!!initialToken}
                            />
                            <FieldDescription>
                                This is to verify if your account already has a Telegram bot linked.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="m@example.com"
                                required
                            />
                        </Field>
                        <Field>
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirm-password">
                                    Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirm}
                                        onChange={e => setConfirm(e.target.value)}
                                        required
                                    />
                                </Field>
                            </Field>
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <Button type="submit" disabled={pending}>{pending ? <><Spinner /> Loading...</> : "Create account"}</Button>
                            <FieldDescription className="text-center">
                                Already have an account? <a href="/login">Sign in</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}

export default SignupPage;