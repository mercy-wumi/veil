import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
  createActionHeaders,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const headers = createActionHeaders();

export const GET = (req: Request) => {
  const payload: ActionGetResponse = {
    type: "action",
    icon: new URL("/imgs/veil-resized.png", new URL(req.url).origin).toString(),
    label: "Send",
    description: "This allows the user to send anonymous message.",
    title: "An anonymous messaging dapp built on Solana Blockchain",
  };

  return Response.json(payload, {
    headers,
  });
};

export const OPTIONS = async () => {
  return new Response(null, { headers });
};

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();

    let account: PublicKey;

    try {
      account = new PublicKey(body.account);
    } catch (e) {
      return new Response("Invalid account provided", {
        status: 400,
        headers,
      });
    }

    const transaction = new Transaction();

    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(VEIL_PROGRAM_ID),
        data: Buffer.from("Anonymous messaging dapp", "utf8"),
        keys: [],
      })
    );

    transaction.feePayer = account;

    const connection = new Connection(clusterApiUrl("devnet"));
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
      },
    });

    return Response.json(payload, {
      headers,
    });
  } catch (error) {
    return Response.json("An unknown error occurred", { status: 400 });
  }
};
