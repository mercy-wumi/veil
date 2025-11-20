import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
  MEMO_PROGRAM_ID,
  ACTIONS_CORS_HEADERS,
  BLOCKCHAIN_IDS,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const blockchain = BLOCKCHAIN_IDS.devnet;

const headers = {
  ...ACTIONS_CORS_HEADERS,
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.4",
};

export const GET = (req: Request) => {
  try {
    const requestUrl = new URL(req.url);

    const baseHref = new URL(`/api/actions/memo`, requestUrl.origin).toString();

    const payload: ActionGetResponse = {
      type: "action",
      icon: new URL(
        "/imgs/veil-resized.png",
        new URL(req.url).origin
      ).toString(),
      label: "Send Anonymous Message",
      description: "This allows the user to send anonymous message.",
      title: "An anonymous messaging dapp built on Solana Blockchain",
      links: {
        actions: [
          {
            label: "Send Message", // Button text
            href: `${baseHref}?message={message}`, // The POST endpoint
            parameters: [
              {
                name: "message", // Matches the {message} in href
                label: "Enter your message", // Placeholder text in input field
                required: true,
              },
            ],
            type: "message",
          },
        ],
      },
    };

    return Response.json(payload, { headers });
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "Invalid request" },
      { status: 500, headers }
    );
  }
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
        programId: new PublicKey(MEMO_PROGRAM_ID),
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
        message: `Success! Message sent to chain`,
      },
    });

    return Response.json(payload, {
      headers,
    });
  } catch (error) {
    return Response.json("An unknown error occurred", { status: 400 });
  }
};
