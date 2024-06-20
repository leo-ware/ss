import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "username and password",
            credentials: {
                username: { label: "Username", type: "text", paceholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize (credentials, req) {
                return { id: "123", name: "Test User"}
            }
        })
    ]
})

export { handler as GET, handler as POST }