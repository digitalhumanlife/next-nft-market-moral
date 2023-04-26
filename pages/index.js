import Head from "next/head"
import Image from "next/image"
import styles from "/home/rockchun/hh-fcc/nextjs-nft-market-moral/styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import GET_ACTIVE_ITEMS from "@/constants/subgraphQueries"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client"

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]
    // const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
    //     //TableName
    //     //Function for the Query
    //     "ActiveItem",
    //     (query) => query.limit(10).descending("tokenId")
    // )
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)
    console.log(listedNfts)

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    loading || !listedNfts ? (
                        <div>loading</div>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            console.log(nft)
                            const { price, nftAddress, tokenId, seller } = nft
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently not enabled</div>
                )}
            </div>
        </div>
    )
}
