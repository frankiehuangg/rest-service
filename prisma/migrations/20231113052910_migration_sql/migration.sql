-- CreateTable
CREATE TABLE "Likes" (
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "Replies" (
    "post_parent_id" INTEGER NOT NULL,
    "post_child_id" INTEGER NOT NULL,

    CONSTRAINT "Replies_pkey" PRIMARY KEY ("post_parent_id","post_child_id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "post_id" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("post_id","tags")
);

-- CreateTable
CREATE TABLE "PostReports" (
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',

    CONSTRAINT "PostReports_pkey" PRIMARY KEY ("post_id","user_id")
);

-- CreateTable
CREATE TABLE "Retweets" (
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Retweets_pkey" PRIMARY KEY ("post_id","user_id")
);
