/* eslint-disable no-loop-func */
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, where } from 'firebase/firestore/lite';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { generateLot, getCreator, getType } from '../../components/interface/editor/utils';
import { cloud, state } from '../state';
import { db, storage } from './firebase';
// import { convertToWebp } from '../common';

export async function handleAddContent(selectedFiles, name, setLoad, content, setContent, caption, orientation, setIsFilePicked, fileInput) {
    let uploadTask = null;
    let newContent = [];
    // handle uploading multiple files with an ordered id
    for (let file of selectedFiles) {
        // check file size
        if (file.size > 5242880) {
            alert("File size is too large. Please upload a file less than 5MB.");
            return;
        }
        // keep track of file upload progress
        let progress = 0;
        // create a unique id for the file
        const id = v4();
        // create a reference to the storage bucket location
        const storageRef = ref(storage, `projects/${name} Media/${id}-${file.name}`);
        // upload the file
        uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot) => {
            // calculate the upload progress
            progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setLoad(`${progress}%`);
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(ref(storage, `projects/${name} Media/${id}-${file.name}`)).then(downloadURL => {
                getContent(name, setContent, newContent, content, id, file.name, file.type, downloadURL, caption, orientation);
            });
            setLoad("5MB Max");
            progress = 0;
        });
    };

    setIsFilePicked(false);
    fileInput.current.value = '';
    newContent = [];
};

// wait for the firebase extension to finish and grab the download url
function getContent(name, setContent, newContent, content, id, filename, filetype, downloadURL, caption, orientation) {
    // add the file to the array of files with an ordered id
    newContent.push({ id, name: `${id}-${filename}`, url: downloadURL, type: filetype.split('/')[0], caption: caption, orientation: orientation });
    // add the new content to the content array
    setContent([...content, ...newContent]);
    // update the firestore document
    setDoc(doc(db, "projects", name), { content: [...content, ...newContent] }, { merge: true });
};

export function handleDeleteContent(item, name, content, setContent) {
    deleteObject(ref(storage, `projects/${name} Media/${item.name}`));
    // remove the item from the content array
    setContent(content.filter(i => i !== item));
    // update the firestore doc
    setDoc(doc(db, "projects", name), {
        content: content.filter(i => i !== item)
    }, { merge: true });
};

export async function handleDeletePost(name, setSaved) {
    setSaved(true);
    await deleteDoc(doc(db, "projects", name));
    // delete firebase storage folder
    listAll(ref(storage, `projects/${name} Media`)).then((res) => {
        res.items.forEach((itemRef) => {
            deleteObject(itemRef);
        });
    });
};

export async function uploadData(name, checked, user, client, category, description, date, url, programArray, content, cover) {
    let by = getCreator(user);
    await setDoc(doc(db, "projects", name), {
        by: by,
        lot: generateLot(client, name, date, by),
        published: checked,
        name: name.replace(/\//g, ""),
        date: Timestamp.fromMillis(new Date(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2]).getTime()),
        category: category,
        client: client,
        type: getType(client),
        description: description,
        url: url,
        program: programArray,
        content: content,
        cover: cover
    }, { merge: true });
};

export async function handleGetAbout() {
    const docRef = doc(db, "info", "About");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        state.about = docSnap.data().text;
    }
}

export async function uploadAbout() {
    await setDoc(doc(db, "info", "About"), {
        text: state.about
    }, { merge: true });
};

export async function handleGetData() {
    cloud.UILoading = true;
    const data = await getDocs(
        query(collection(db, "projects"),
            where("published", "==", true),
            orderBy("date", "desc")));
    cloud.data = data.docs.map(doc => doc.data());
    cloud.UILoading = false;
}

export async function handleGetCategories() {
    const data = await getDocs(
        query(collection(db, "projects"),
            // where("published", "==", true),
            orderBy("date", "desc")));
    state.categories = [...new Set(data.docs.map(doc => doc.data().category))];
    state.categories.sort();
}

export async function handleGetContent(name, setContent) {
    getDoc(doc(db, "projects", name))
        .then((doc) => {
            if (doc.exists()) {
                setContent(doc.data().content);
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
}

export async function fillFormData(IDs, name, setDate, setChecked, setCategory, setClient, setDescription, setURL, setProgramArray, formatDate) {
    if (IDs.indexOf(name) !== -1) {
        const docSnap = await getDoc(doc(db, "projects", name));
        if (docSnap.exists()) {
            setDate(formatDate(docSnap.data().date.toDate()));
            setChecked(docSnap.data().published);
            setClient(docSnap.data().client);
            setCategory(docSnap.data().category);
            setDescription(docSnap.data().description);
            setURL(docSnap.data().url);
            setProgramArray(docSnap.data().program);
        } else {
            console.log("No such document!");
        }
    }
}

export async function getFormLists(setIDs, setCategories) {
    const data = await getDocs(collection(db, "projects"));
    setIDs(data.docs.map((doc) => doc.id));
    setCategories([...new Set(data.docs.map((doc) => doc.data().category))]);
}