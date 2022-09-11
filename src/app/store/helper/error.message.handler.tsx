import { notificationFn } from '../../core/notification/notification';

export const errorMessage = (errors) => {
    let banglaMsg: Map<number, string> = new Map();
    banglaMsg.set(2, 'প্রোফাইলটি ক্লেইম করার অনুমতি নাই।');
    banglaMsg.set(6, 'প্রোফাইলটি খুঁজে পাওয়া যায় নাই।');
    banglaMsg.set(13, 'নম্বরটি ইতোমধ্যে নিবন্ধিত।');

    let msg = '';
    Object.keys(errors).forEach(key => {
        msg += banglaMsg.has(+key)
            ? banglaMsg.get(+key) + '\n'
            : errors[key] + '\n';
    });
    notificationFn(msg.trim());
}