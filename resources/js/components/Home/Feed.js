import React, { useState, useEffect } from "react";

const Feed = () => {
    const [items, setItems] = useState([]);
    const rssUrl = "https://cointelegraph.com/rss/tag/altcoin";
    const getRss = async () => {
        const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
        const { contents } = await res.json();
        const feed = new window.DOMParser().parseFromString(
            contents,
            "text/xml"
        );
        const items = feed.querySelectorAll("item");
        const feedItems = [...items].map((el) => ({
            link: el
                .querySelector("link")
                .innerHTML.replace("<![CDATA[", "")
                .replace("]]>", ""),
            title: el
                .querySelector("title")
                .innerHTML.replace("<![CDATA[", "")
                .replace("]]>", ""),
            author: el
                .querySelector("creator")
                .innerHTML.replace("<![CDATA[", "")
                .replace("]]>", ""),
        }));

        setItems(feedItems);
    };

    useEffect(() => {
        getRss();
    }, []);

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card mt-2" style={{ maxHeight: "390px" }}>
                    <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Feeds</h4>
                    </div>
                    <div className="card-body px-0">
                        <div
                            className="table-responsive px-3"
                            data-simplebar
                            style={{ minHeight: "332px" }}
                        >
                            <table className="table align-middle table-nowrap table-borderless">
                                <tbody>
                                    {items.map((item) => {
                                        return (
                                            <tr key={item.title}>
                                                <td>
                                                    <a
                                                        className="text-green"
                                                        href={item.link}
                                                        target="_blank"
                                                    >
                                                        {item.title}
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;
