import { ThreadAllBookmark, ThreadAllSaved } from './../query/thread/ThreadBookmark';
import {
	validationThreadCreate,
	validationThreadDelete,
	validationThreadLike,
	validationThreadUpdate,
	validationThreadSave,
	validationThreadComment,
	validationThreadDetail,
} from "./../validations/ThreadValidation";
import prisma from "../../../prisma";
import { validationThread } from "../validations/ThreadValidation";
import { notificationSend } from "./NotificationModel";
import { allThreadQuery } from "../query/thread/ThreadAll";
import { ThreadDetails } from "../query/thread/ThreadDetails";
import { ThreadDetailLikes } from "../query/thread/ThreadDetailLikes";
import { ThreadCreate } from "../query/thread/ThreadCreate";
import { ThreadThisDisLike, ThreadThisLikes } from "../query/thread/ThreadThisLikes";
import { ThreadUserComment } from '../query/thread/ThreadComments';
import { ThreadUpdated } from '../query/thread/ThreadUpdate';

/**
 * It's a function that returns a promise that resolves to a string or an array of objects
 * @param {number} skip - number - the number of posts to skip
 * @returns a promise.
 */

export const getAllThread = async (skip: number) => {
	if ((await validationThread(skip)) === -1) return "Posts is empty";
	return await allThreadQuery(skip);
	// return getTreadsAll;
};

/**
 * It gets the thread details of a thread with a given id and skips the first n number of comments
 * @param {string} id - string -&gt; id of the thread
 * @param {number} skip - number =&gt; skip is the number of posts to skip.
 * @returns the result of the ThreadDetails function.
 */

export const getTreadDetail = async (id: string, skip: number) => {
	if ((await validationThreadDetail(id)) === -1) return "Thread is empty";
	const getThreadDetails = await ThreadDetails(id, skip);
	return getThreadDetails;
};

/**
 * If the thread is empty, return 'Thread is empty', otherwise return the thread details.
 * @param {string} id - The id of the thread
 * @param {number} skip - number
 * @returns The return value is the result of the function.
 */
export const getThreadDetailLike = async (id: string, skip: number) => {
	if ((await validationThreadDetail(id)) === -1) return "Thread is empty";
	const ThreadLike = await ThreadDetailLikes(id, skip);
	return ThreadLike;
};

/**
 * If the validationThreadCreate function returns -1, return "Description can't be empty", otherwise
 * return the result of the ThreadCreate function.
 * @param {string} authorId - string
 * @param {string} description - string
 * @returns a promise.
 */

export const getThreadCreate = async (authorId: string, description: string) => {
	if ((await validationThreadCreate(authorId, description)) === -1) return "Description can't be empty";
	const threadCreate = await ThreadCreate(authorId, description);
	return threadCreate;
};

/**
 * If the validationThreadLike function returns -1, -2, -3, or -4, return the appropriate error
 * message. Otherwise, call the ThreadThisLikes function and the notificationSend function, and return
 * the result of the ThreadThisLikes function.
 * @param {string} threadId - The id of the thread
 * @param {string} userId - The user who liked the thread
 * @returns The return value is a string.
 */

export const thisThreadLikes = async (threadId: string, userId: string) => {
	if ((await validationThreadLike(threadId, userId)) === -1) return "Can't be empty";
	if ((await validationThreadLike(threadId, userId)) === -2) return "Can't find thread";
	if ((await validationThreadLike(threadId, userId)) === -3) return "Can't find user";
	if ((await validationThreadLike(threadId, userId)) === -4) {
		const disLike = await ThreadThisDisLike(threadId, userId);
		return disLike;
	}

	await notificationSend(userId, "", "", threadId, "Like");
	const threadLike = await ThreadThisLikes(threadId, userId);

	return threadLike;
};

/**
 * If the validation function returns -1, -2, or -3, return a string. If it returns -4, return the
 * result of the ThreadAllBookmark function. Otherwise, return the result of the ThreadAllSaved
 * function.
 * @param {string} threadId - string
 * @param {string} userId - The user's id
 * @returns a promise.
 */
export const threadSave = async (threadId: string, userId: string) => {
	if ((await validationThreadSave(threadId, userId)) === -1) return "Can't be empty";
	if ((await validationThreadSave(threadId, userId)) === -2) return "Can't find thread";
	if ((await validationThreadSave(threadId, userId)) === -3) return "Can't find user";

	if ((await validationThreadSave(threadId, userId)) === -4) {
		const savedBookmark = await ThreadAllBookmark(threadId, userId)
		return savedBookmark;
	}

	const threadSave = await ThreadAllSaved(threadId,userId)
	return threadSave;
};

export const threadUpdate = async (threadId: string, authorId: string, description: string) => {
	if ((await validationThreadUpdate(threadId, authorId, description)) === -1)
		return "threadId, authorId, description can't be empty";
	if ((await validationThreadUpdate(threadId, authorId, description)) === -2) return "threadId can't find";
	if ((await validationThreadUpdate(threadId, authorId, description)) === -3) return "userId can't find";
	
	return await ThreadUpdated(threadId, description)

};

export const threadDelete = async (threadId: string, authorId: string) => {
	if ((await validationThreadDelete(threadId, authorId)) === -1) return "threadId and authorId can't be empty";
	if ((await validationThreadDelete(threadId, authorId)) === -2) return "threadId can't find";
	if ((await validationThreadDelete(threadId, authorId)) === -3) return "userId can't find";

	const deleted = await prisma.thread.delete({ where: { id: threadId } });
	return deleted;
};

export const threadComment = async (threadId: string, userId: string, description: string) => {
	if ((await validationThreadComment(threadId, userId, description)) === -1)
		return "threadId, authorId, description can't be empty";
	if ((await validationThreadComment(threadId, userId, description)) === -2) return "threadId can't find";

	const threadComment = await ThreadUserComment(threadId, userId, description);

	await notificationSend(userId, description, "", threadId, "Comment");

	return threadComment;
};
