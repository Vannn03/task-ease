import { signOut } from '@/app/auth'

const Page = () => {
    return (
        <div>
            <form
                action={async () => {
                    'use server'
                    await signOut({ redirectTo: '/signup' })
                }}
                className="w-1/2"
            >
                <button type="submit" className="btn btn-error">
                    Sign out
                </button>
            </form>
        </div>
    )
}

export default Page
