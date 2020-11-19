import axios from 'axios' 

//带书籍数量的父分类(所有分类，男生(古代言情)，女生，picture, press,)
export function getCategories() {
    return axios.get(`/categories`)
}
//获取分类（带子类，古代言情（穿越时空", "古代历史", "古典架空", "宫闱宅斗", "经商种田））
export function getSubCategories() {
    return axios.get(`/sub-categories`)
}
// 获取排名分类（排行榜榜单）
export function getRank() {
    return axios(`/rank-category`) 
}
// 获取排名分类详情（排名对应的书籍）
export function getRankBooks(id) {
    return axios.get(`/rank/${id}`)
}
// 获取分类详情
export function getCategoriesInfo(sex, type, major, minor, start, limit) {
    return axios.get(`/category-info?gender=${sex}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
}
// 获取书籍详情(详情页)
export function getBookDetail(id) {
    return axios.get(`/book-info/${id}`)
}
// 获取书籍相关推荐
export function getRecommend (id) {
    return axios.get(`/recommend/${id}`)
}
// 获取书籍源 
export function getBookSources(id) {
    return axios.get(`/book-sources?view=summary&book=${id}`)
}
// 获取书籍章节(根据书籍源id获取章节) 
export function getBookChapters(id) {
    return axios.get(`/book-chapters/${id}`)
}
// 获取章节内容(根据章节获取内容)
export function getChapterContent(link) {
    return axios.get(`/chapters/${link}`)
}
// 获取搜索结果
export function search(keyword) {
    return axios.get(`/search?keyword=${keyword}`)
}