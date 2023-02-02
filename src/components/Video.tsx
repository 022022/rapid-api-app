import { VideoItem } from '../types/types';

function Video({videoItem}: {videoItem: VideoItem}){
  const link = "https://www.youtube.com/watch?v=" + videoItem.id.videoId;
  const title = makeTitle(videoItem.snippet.title, 37);

  function makeTitle(str: string, l: number){
    if(str.length > l){
      return str.slice(0, l - 3) + '...';
    }
    return str;
  }

  return <>
  <div className="card w-60 bg-black shadow-xl border-zinc-400/25 border border-solid">
  <div className="card-body items-center text-center px-4 pb-6">
    <h2 className="card-title pt-1">{title}</h2>
    <figure><img src={videoItem.snippet.thumbnails.high.url} alt={videoItem.snippet.title}/></figure>
    <div className="card-actions h-full  content-end">
      <a className="link link-neutral-content " href={link}>Watch on Youtube</a>
    </div>
  </div>
</div>
  </>

}

export default Video;