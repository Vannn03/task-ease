import { signOut } from '@/auth'

const Page = () => {
    return (
        <div>
            <form
                action={async () => {
                    'use server'
                    await signOut({ redirectTo: '/' })
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
