import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Card from "../components/Card.js";

const apikey = "Ps1IuoDjfUsqj7stXYd13drIObVZ2wgb";

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apikey}`
);

const Index = () => {
  const [NFTs, setNFTs] = useState([]);
  const [wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [fetchCollection, setFetchCollection] = useState(false);

  const handleWalletInput = (event) => {
    setWallet(event.target.value);
  };

  const handleCollectionInput = (event) => {
    setCollection(event.target.value);
  };

  const handleCheckbox = (event) => {
    setFetchCollection(event.target.checked);
  };

  const handleClick = () => {
    if (fetchCollection) {
      fetchNFTsCollection();
    } else fetchNFTs();
  };

  useEffect(() => {
    console.log("NFTs: ", NFTs);
  }, [NFTs]);

  const fetchNFTs = async () => {
    try {
      if (!collection.length) {
        const response = await web3.alchemy.getNfts({ owner: wallet });
        setNFTs(response.ownedNfts);
      } else {
        const response = await web3.alchemy.getNfts({
          owner: wallet,
          contractAddresses: collection,
        });

        setNFTs(response.ownedNfts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNFTsCollection = async () => {
    try {
      if (collection.length) {
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apikey}/getNFTsForCollection/`;
        const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

        const requestOptions = {
          method: "GET",
        };

        const response = await fetch(fetchURL, requestOptions);
        const responseData = await response.json();

        setNFTs(responseData.nfts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start p-4">
      <header className="flex flex-col h-50 w-full items-center justify-center">
        <h1 className="neon-text">NFT Gallery</h1>
        <div className="flex flex-row gap-4 py-6">
          <Input
            disabled={fetchCollection}
            onChange={handleWalletInput}
            labelLeft="wallet"
            id="wallet"
            width="400px"
            aria-label="Wallet Input"
          />
          <Input
            onChange={handleCollectionInput}
            labelLeft="collection"
            id="collection"
            width="400px"
            aria-label="Collection Input"
          />
          <label>
            <input onChange={handleCheckbox} type="checkbox" />
            Search by collection
          </label>
        </div>
        <Button onClick={handleClick}>Lets go!</Button>
      </header>
      <main className="flex flex-wrap gap-10 mt-4 w-5/6 justify-center">
        {NFTs.length > 0 &&
          NFTs.map((NFT, index) => {
            {
              return NFT.title != "" && <Card key={index} NFT={NFT} />;
            }
          })}
      </main>
    </div>
  );
};

export default Index;
