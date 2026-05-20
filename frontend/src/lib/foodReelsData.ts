export type FoodReel = {
  _id: string;
  video: string;
  name: string;
  description: string;
  foodPartnerId: {
    _id: string;
    name: string;
    contactName: string;
    phone: string;
    address: string;
    avatar: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

//"_id": "6a0d49c06bdc54091f63d723",
// "video": "https://ik.imagekit.io/su2hq5kc4/zomato-reel/1779255731826-food-video_mljYnioFn.mp4",
// "name": "test food name",
// "description": "test food description",
// "foodPartnerId": {
//     "_id": "6a0d01eace7163643619cbee",
//     "name": "test business name",
//     "contactName": "test contact name",
//     "phone": "1234567890",
//     "address": "test address",
//     "email": "test@gmail.com"
// },
// "createdAt": "2026-05-20T05:42:24.886Z",
// "updatedAt": "2026-05-20T05:42:24.886Z",
// "__v": 0

export const formatReelCount = (likeCount: number) => {
  if (likeCount > 1_000_000) {
    return `${(likeCount / 1_000_000).toFixed(1)}M`;
  }
  if (likeCount > 1_000) {
    return `${(likeCount / 1_000).toFixed(1)}K`;
  }
};
