let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let iss = {
    lat: 0,
    long: 0,
    alt: 0,
    vel: 0,
    timest: 0
}

setInterval(getISS, 5000);

function getISS()
{
    fetch(url)
    .then(res => res.json())
    .then((out) => {

        iss = {
            lat: out.latitude,
            long: out.longitude,
            alt: out.altitude,
            vel: out.velocity,
            vis: out.visibility,
            timest: out.timestamp
        }

        update(iss);
        // console.log(out);
    })
    .catch(err => { throw err });
}

function convertTime(unix_timestamp)
{
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

function update(iss)
{
    document.getElementById("timestamp").innerHTML = "Laatste update: " + convertTime(iss.timest);
    document.getElementById("alt").innerHTML = Math.round(iss.alt * 1000)/1000;
    document.getElementById("vel").innerHTML = Math.round(iss.vel * 1000)/1000;
    document.getElementById("vis").innerHTML = iss.vis;
}