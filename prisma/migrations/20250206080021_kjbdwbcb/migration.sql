-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "testRating" INTEGER,
    "quntityRating" INTEGER,
    "easyToUseRating" INTEGER,
    "accuracyRating" INTEGER,
    "comment" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
