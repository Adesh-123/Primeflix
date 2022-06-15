import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React,{useRef,useState} from 'react'
import ListItem from '../listItem/ListItem'
import "./List.scss"

function List({list}) {
    var w=window.innerWidth;
    const [ismoved,setIsmoved]=useState(false);
    const [slidenumber,setSlidenumber] =useState(0);
    const listRef=useRef();
    const handleclick=(direction)=>{
        let distance =listRef.current.getBoundingClientRect().x-50;
        if(direction==="left" && slidenumber>0){
            setSlidenumber(slidenumber-1);
            listRef.current.style.transform=`translateX(${230+distance}px)`
        }
        if(direction==="right" && slidenumber<(list.content.length/Math.floor((w-50)/230))-1){
            setSlidenumber(slidenumber+1);
            setIsmoved(true);
            listRef.current.style.transform=`translateX(${-230+distance}px)`
        }
}

  return (
    <div className='list'>
        <span className='listTitle'>{list.title}</span>
        <div className='wrapper'>
            <ArrowBackIosOutlined className='sliderArrow left' onClick={()=>handleclick("left")} style={{display: !ismoved && "none"}}/>
            <div className='container' ref={listRef}>
               {list.content.map((item,i)=>(
                   <ListItem item={item} index={i} key={i}/>
               ))}
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right'  onClick={()=>handleclick("right")}/>
        </div>
    </div>
  )
}

export default List