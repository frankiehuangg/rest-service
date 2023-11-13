import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const likesData = [
    {
        user_id: 1,
        post_id: 1,
    },
    {
        user_id: 2,
        post_id: 1,
    },  
];

const main = async() => {
    console.log("Start seeding");
    const data = [...likesData];

    await prisma.likes.deleteMany();

    const createdLikes = await Promise.all(
        data.map(async (_likes) => {
            const likes = await prisma.likes.create({
                data: {
                    user_id: _likes.user_id,
                    post_id: _likes.post_id
                },
            });

            return likes;
        })
    )
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });