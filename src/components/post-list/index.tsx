'use client';

import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import PostItem from "./post-item";
import { GetPostListResponse } from "@/app/api/post/route";
import LoadMore from "./load-more";

type Props = {
  cursor: number;
}
const DEFAULT_LIMIT = 10;
const PostList = ({ cursor: initialOffset }: Props) => {
  const getKey = useCallback((pageIndex: number, previousPageData: GetPostListResponse) => {
    if (previousPageData && !previousPageData.data) return null;
    if (pageIndex === 0) return `/api/post?cursor=${initialOffset}&limit=${DEFAULT_LIMIT}`;
    return `/api/post?cursor=${previousPageData.nextOffset ?? initialOffset }&limit=${DEFAULT_LIMIT}`;
  }, [initialOffset]);

  const {
    data: pageListData, size, setSize, isLoading
  } = useSWRInfinite<GetPostListResponse>(
    getKey, 
    (url) => fetch(url).then(res => res.json()),
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateAll: false,
      parallel: false,
      dedupingInterval: 1000,
    }
  );
  
  if (!pageListData) return null;
  return (
    <>
      {
        pageListData.map((page) => (
          page.data.map(post => <PostItem post={post} key={post.id} />) 
        ))
      }
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <LoadMore 
          lastPage={pageListData.at(-1)?.lastPage ?? false} 
          loading={isLoading} 
          load={() => { console.log(size); setSize(size + 1)}} 
        />
      </div>
    </>
  );
}
 
export default PostList;