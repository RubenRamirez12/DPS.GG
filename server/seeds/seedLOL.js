import LOLUserModel from "../models/LOLUserModel.js"

export const seedLOLUsers = async () => {
    const user1 = new LOLUserModel({
        username: "Draconify",
        riotId: "12345",
        rank: "Challenger"
    })

    const user2 = new LOLUserModel({
        username: "Poison",
        riotId: "23456",
        rank: "Challenger"
    })

    const user3 = new LOLUserModel({
        username: "Synergy",
        riotId: "34567",
        rank: "Iron"
    })

    await user1.save()
    await user2.save()
    await user2.save()
}
