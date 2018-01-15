/**
 * Created by lenovo on 2017/12/26.
 */
let baseUrl = 'http://www.takecare.com.cn'
// 游客session
export const _session = '37249135-ed63-429e-9cad-a858009a5115'
// 读取接口
const _readURL = '/Libra.Web.AppSync.AppSyncBatchReadData2.aspx'
// 写入
export const _writeURL = '/Libra.Web.Api.ApiBatchWrite.aspx'+'?_SESSION_='+ _session
// 登录接口
export const _loginURL = '/Libra.Web.Authentication.GetSession.aspx'
// 基本接口
export const _baseUrl = baseUrl
// 请求url
export const _reqUrl = _readURL+'?_SESSION_='+ _session
// 首页轮播图和海报
export const _rotationPicture = '2336dd68-6bb4-4669-b50e-a85500fe3815'
// 产品大类
export const _productType = '8011ec77-eee3-474e-8ea5-a851011d3b89'
// 产品二级分类
export const _subProductType = '0a8f4172-a1d5-43f3-a558-a851011ebabd'
// 产品信息
export const _productInfos = '4934f663-bf22-44ec-8bdb-a851011cb71d'
// 获取图片
export const _attatchmentURL = baseUrl+ '/Libra.Web.Businesses.Attachments.GetFile.aspx'
// 获取新闻
export const _news = 'd071d996-e43d-45c4-89e6-a8550111a585'
// 获取置顶新闻
export const _topNews = '1ddeb688-8de6-4a0c-9d5f-a85600aecd39'
// 新品新闻
export const _typeNews = 'b482e109-f601-45d1-930b-a85600ebe511'
// 加入我们
export const _joinUs = '7136537b-6eb8-47d9-b3b4-a855009f9f49'
// 产品推荐表
export const _prdRecommend = '478fd165-159d-416f-8ba9-a857016194ce'
// 增加流量次数
export const _prdRead = 'f60aee17-1430-4a25-858e-a85800a34fd1'
// 关于我们查询
export const _about = '0e77cdf2-b46d-4b70-8e18-a851011f28e5'