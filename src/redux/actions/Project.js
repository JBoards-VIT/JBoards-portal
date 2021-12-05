export const setProject = (projectDetails) => {
    return {
        type: "SET_PROJECT",
        payload: {
            projectDetails
        }
    }
}