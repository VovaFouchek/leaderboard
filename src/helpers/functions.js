export const ordinal_suffix_of = (i) => {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

export const sortedList = (list, setList, sortValue, setSortValue) => {
    sortValue === "descending" ? setSortValue("ascending") : setSortValue("descending");
    if (sortValue === "descending") {
        setList(list.sort((a, b) => a.score - b.score));
    } else {
        setList(list.sort((a, b) => b.score - a.score));
    }
    console.log(list);
};
