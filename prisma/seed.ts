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

const postReports = [
    {
        post_id: 1,
        user_id: 5,
        description: "report 1"
    },
    {
        post_id: 1,
        user_id: 6,
        description: "report 2"
    },
    {
        post_id: 1,
        user_id: 4,
        description: "report 3"
    }
];

const main = async() => {
    console.log("Start seeding");
    const data = [...likesData];
    const reports = [...postReports]

    await prisma.likes.deleteMany();
    await prisma.postReports.deleteMany();

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

    const createdPostReports = await Promise.all(
        reports.map(async (_report) => {
            const reports = await prisma.postReports.create({
                data: {
                    post_id: _report.post_id,
                    user_id: _report.user_id,
                    description: _report.description
                }
            })
            return reports
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