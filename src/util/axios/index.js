import http from './axios'


//-------------------菜单管理-----------------------
// post接收data数据
export function postForm(data) {
    return http.post('/api/menuadd', data)
}

//获取menulist数据
export function getMenuList(params) {
    // 默认传入参数,让结果又children
    return http.get('/api/menulist', { params })
}
// 删除menulist一条数据
export function deleteMenuList(data) {
    return http.post('/api/menudelete', data)
}

export function getMenuListOne(params) {
    return http.get('/api/menuinfo', { params })
}

// 修改menulist一条数据
export function editMenuList(data) {
    return http.post('/api/menuedit', data)
}

// ----------角色管理------------------
// 获取角色列表
export function getRoleList() {
    return http.get('/api/rolelist')
}

// 添加角色
export function postRole(data) {
    return http.post('/api/roleadd', data)
}

// 删除角色
export function deleteRole(data) {
    return http.post('/api/roledelete', data)
}

// 获取一条角色信息
export function getRoleOneInfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}

// 编辑角色
export function editRoleInfo(data) {
    return http.post('/api/roleedit', data)
}

//---------------管理员管理-----------------
//获取管理员列表（分页）
export function getAdminList(params) {
    return http.get('/api/userlist', { params })
}

//获取所有的用户
export function getAdminListTotal() {
    return http.get('/api/usercount')
}

// 添加管理员
export function postAdmin(data) {
    return http.post('/api/useradd', data)
}

// 删除管理员
export function delAdmin(data) {
    return http.post('/api/userdelete', data)
}

// 获取一条管理员数据
export function getAdminOne(params) {
    return http.get('/api/userinfo', { params })
}

// 修改管理员数据
export function editAdmin(data) {
    return http.post('/api/useredit', data)
}

// 管理员登陆
export function adminLogin(data) {
    return http.post('/api/userlogin', data)
}

//-----------------商品分类----------------------
// 获取商品列表
export function getCateList(params) {
    return http.get('/api/catelist',{params})
}

// 添加商品
export function postCate(data) {
    return http.post('/api/cateadd', data)
}

// 删除商品
export function delCate(data) {
    return http.post('/api/catedelete', data)
}

// 获取商品一条数据
export function getCateOne(params) {
    return http.get('/api/cateinfo', { params })
}

// 编辑商品信息
export function editCate(data) {
    return http.post('/api/cateedit', data)
}

//-------------商品规格------------------
// 商品规格列表（分页）
export function getSpecsList(params) {
    return http.get('/api/specslist', { params })
}

// 商品规格列表总数
export function getSpecsTotal() {
    return http.get('/api/specscount')
}

// 添加规格
export function postSpecs(data) {
    return http.post('/api/specsadd', data)
}

// 删除规格
export function delSpecs(data) {
    return http.post('/api/specsdelete', data)
}

// 获取规格一条数据
export function getSpecsOne(params) {
    return http.get('/api/specsinfo', { params })
}

// 编辑规格信息
export function editSpecs(data) {
    return http.post('/api/specsedit', data)
}


//---------------商品管理--------------
// 获取商品列表
export function getGoodsList(params) {
    return http.get('/api/goodslist',{
        params
    })
}

export function getGoodsTotal(){
    return http.get('/api/goodscount')
}

// 添加商品
export function postGoods(data) {
    return http.post('/api/goodsadd', data)
}

// 删除商品
export function delGoods(data) {
    return http.post('/api/goodsdelete', data)
}

// 获取商品一条数据
export function getGoodsOne(params) {
    return http.get('/api/goodsinfo', { params })
}

// 编辑商品信息
export function editGoods(data) {
    return http.post('/api/goodsedit', data)
}


//---------------会员管理-------------
// 会员列表
export function getMemberList() {
    return http.get('/api/memberlist')
}

// 获取会员一条数据
export function getMemberOne(params) {
    return http.get('/api/memberinfo', { params })
}

// 编辑会员信息
export function editMember(data) {
    return http.post('/api/memberedit', data)
}

//------------轮播图管理-------------
// 获取轮播图列表
export function getBannerList() {
    return http.get('/api/bannerlist')
}

// 添加轮播图
export function postBanner(data) {
    return http.post('/api/banneradd', data)
}

// 删除轮播图
export function delBanner(data) {
    return http.post('/api/bannerdelete', data)
}

// 获取轮播图一条数据
export function getBannerOne(params) {
    return http.get('/api/bannerinfo', { params })
}

// 编辑轮播图信息
export function editBanner(data) {
    return http.post('/api/banneredit', data)
}

//---------------活动---------------
// 获取活动列表
export function getSeckList() {
    return http.get('/api/secklist')
}

// 添加活动
export function postSeck(data) {
    return http.post('/api/seckadd', data)
}

// 删除活动
export function delSeck(data) {
    return http.post('/api/seckdelete', data)
}

// 获取活动一条数据
export function getSeckOne(params) {
    return http.get('/api/seckinfo', { params })
}

// 编辑活动信息
export function editSeck(data) {
    return http.post('/api/seckedit', data)
}