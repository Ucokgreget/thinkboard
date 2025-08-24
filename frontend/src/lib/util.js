export function formatDate(date){
    const d = new Date(date)
    return d.toLocaleDateString("id-ID", {
        day:"numeric",
        month:"short",
        year:"numeric"
    })

}