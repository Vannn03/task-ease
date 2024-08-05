export const showModal = (dialogId: string) => {
    const modal = document.getElementById(dialogId) as HTMLDialogElement | null
    if (modal) {
        modal.showModal()
    }
}

export const closeModal = (dialogId: string) => {
    const modal = document.getElementById(dialogId) as HTMLDialogElement | null
    if (modal) {
        modal.close()
    }
}