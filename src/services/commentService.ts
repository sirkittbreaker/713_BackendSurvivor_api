import * as repo from "../repositories/commentRepository";

export async function addComment(
  teacherId: number,
  studentId: string,
  content: string
) {
  const newComment = await repo.addComment(teacherId, studentId, content);
  return newComment;
}

export async function addReply(
  commentId: number,
  studentId: string,
  teacherId: number,
  content: string
) {
  const newReply = await repo.addReply(
    commentId,
    studentId,
    teacherId,
    content
  );
  return newReply;
}

export async function getTeacherComments(teacherId: number, studentId: string) {
  const comments = await repo.getTeacherComments(teacherId, studentId);
  return comments;
}
