import React from "react";
import { Button } from "@nextui-org/react";

const Card = ({ NFT }) => {
  return (
    <div className="w-1/4 flex flex-col neon-card bg-gray-900">
      <div className="rounded-3xl">
        <img
          className="object-cover min-h-[30rem] max-h-[30rem] rounded-3xl w-full"
          src={NFT.media[0].gateway}
        />
      </div>
      <div className="flex flex-col min-h-[225px] max-h-[275px] p-4 rounded-b-3xl">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl min-h-[50px]">{NFT.title}</h2>
          <p className="text-xl">
            ID: {NFT.id.tokenId.substr(NFT.id.tokenId.length - 4)}
          </p>
        </div>
        <p className="mt-1">{`${NFT.contract.address.substr(
          0,
          4
        )}...${NFT.contract.address.substr(
          NFT.contract.address.length - 4
        )}`}</p>

        <div className="flex flex-grow min-h-[105px] max-h-[105px] my-2 justify-start items-start">
          <p className="">{NFT.description?.substr(0, 150)}...</p>
        </div>
        <div className="flex justify-center">
          <Button size="sm" color="gradient" shadow>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://etherscan.io/token/${NFT.contract.address}`}
            >
              View on etherscan!
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
