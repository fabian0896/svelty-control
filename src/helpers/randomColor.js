export default async function(){
    const res = await fetch('http://www.colr.org/json/color/random')
    const data = await res.json()
    return "#" + data.new_color
}