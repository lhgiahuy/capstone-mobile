export interface CommentDetail {
  commentId: string;
  eventId: string;
  userId: string;
  commentText: string;
  createAt: string;
}

export interface CommentProp {
  eventId: string;
}

export interface Review {
  rating: number;
  comment: string;
  eventId: string;
}

export interface ListReviewData {
  reviewId: string;
  rating: number;
  comment: string;
  fullname: string;
  avatar: string;
}
