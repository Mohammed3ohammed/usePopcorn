import { useState } from "react";
import Star from "./Star";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
}

const starContainerStyle = {
    display: "flex"
}


export default function StarRating() {
    return (
        <div style={containerStyle} className="className">
            <div style={starContainerStyle}>
            {Array.from({length: maxRating}, (_, i) => (
                <Star 
                key={i}
                full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                onRate={() => handleRating(i + 1)}
                onHoverIn={() => setTempRating(i + 1)}
                onHoverOut={() => setTempRating(0)}
                color={color}
                size={size}
                />
            ))}
            </div>
        </div>
    )
}