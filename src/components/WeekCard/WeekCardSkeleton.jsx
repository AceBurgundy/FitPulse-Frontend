import React from 'react'
import "./WeekCard.css"
import Skeleton from "react-loading-skeleton"

const WeekCardSkeleton = ({cards}) => {

  return (

    Array(cards).fill(0).map((card, index) => {
        
        return (
            <div key={index} style={{
            display: "grid",
            gridTemplateColumns: "10% 90%",
            width: "100%"
        }}>
            <div className='week_card__left'>
                <Skeleton circle style={{
                    width: "2rem",
                    height: "2rem"
                }}/>
                <div className="week_card__left-line">
                    <Skeleton height={"100%"}/>
                </div>
            </div>
            <div>
                <Skeleton className="week_card__right-title" style={{
                    width: "30%"
                }}/>
                <div className="week_card__right-days">
                    <Skeleton 
                        circle count={7}
                        containerClassName='week_card__right-days-skeleton'
                        className='week_card__right-days-day-circle-skeleton'
                    />
                </div>
            </div>
        </div>
        )
    })

   )
}

export default WeekCardSkeleton