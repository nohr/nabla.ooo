import { handleGetData, uploadData } from "../../../common/api/firebase.editor";

// convert firebase timestamp to date
export const convertDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
}

export function clearSelectedName(
    nameInput,
    dataList,
    setName,
    setChecked,
    setCategory,
    setClient,
    setDescription,
    setDate,
    setProgram,
    setProgramArray,
    setContent,
    setIsFilePicked,
    setURL,
    setSelectedFiles
) {
    if (nameInput.current) {
        setName('');
        setChecked(false);
        setCategory('');
        setClient('');
        setDescription('');
        setDate('');
        setProgram('');
        setProgramArray([]);
        setURL('');
        setContent([]);
        setSelectedFiles('');
        setIsFilePicked(false);

        let options = dataList.current.options;

        for (var i = 0; i < options.length; i++) {
            options[i].selected = false;
        }
    }
};

export function handleUploadPost(
    name,
    checked,
    user,
    client,
    category,
    description,
    date,
    url,
    programArray,
    content,
    cover,
    setSaved,
    setContent
) {
    if (name !== '' && category !== '' && client !== '' && date !== '') {
        uploadData(name, checked, user, client, category, description, date, url, programArray, content, cover);
        handleGetData(); setContent([]); setSaved(true);
    }
};

export function generateElement(item, index) {
    return item.type === 'image' ? <img src={item.url} alt={item.name} key={index} /> :
        item.type === 'video' ? <video src={item.url} alt={item.name} key={index} controls></video> :
            item.type === 'tiktok' ? <iframe src={`https://www.tiktok.com/embed/${item.url}`} title={item.url} key={Math.random()} allow-scripts="true"
                sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe> :
                <p>{item.type} type not supported</p>;
}

// export a function that changes the the string extension to a webp extension
export function convertToWebp(url) {
    let newUrl = url.split('.');
    newUrl[newUrl.length - 2] += '_1080x1080';
    newUrl[newUrl.length - 1] = 'webp';
    return newUrl.join('.');
}

//convert mm/dd/yyyy to yyyy-mm-dd
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// Generate a lot number for the project
export function generateLot(client, name, date, by) {
    const d = new Date(date).getFullYear().toString().slice(2, 5);
    const m = new Date(date).getMonth() + 1;
    console.log(d + m);
    return (client.slice(0, 2).toUpperCase())
        + (d + m)
        + (name.slice(0, 2).toUpperCase())
        + (by.slice(0, 1));
}

export function getCreator(user) {
    let name = user.displayName;
    // get the initials of the name
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
}

export function getType(client) {
    if (client === "Nabla" ||
        client === "NYU" ||
        client === "Nohri") {
        return "Self-Initiated";
    } else {
        return "Client";
    }
};