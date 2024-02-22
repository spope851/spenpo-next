-- CreateTable
CREATE TABLE "Mandarin" (
    "id" SERIAL NOT NULL,
    "traditional" TEXT NOT NULL,
    "simplified" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,

    CONSTRAINT "Mandarin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truth" (
    "id" SERIAL NOT NULL,
    "sentence" TEXT NOT NULL,
    "is_true" BOOLEAN NOT NULL,

    CONSTRAINT "Truth_pkey" PRIMARY KEY ("id")
);
