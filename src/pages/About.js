import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";

function About() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let startTime = new Date().getTime();
        let interval = setInterval(() => {
            setIsLoading(true);
            if (new Date().getTime() - startTime > 1000) {
                setIsLoading(false);
                clearInterval(interval);
                return;
            }

        }, 0);
    }, []);
    return (
        <div>
            {isLoading ? <CircularProgress /> : <p>About Page</p>}
        </div>
    )
}

export default About;