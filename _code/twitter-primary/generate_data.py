import twitter
from dotenv import load_dotenv
import os
import csv
from datetime import datetime
import numpy as np

'''
Populates csv with latest data from Twitter
'''

load_dotenv()
api = twitter.Api(consumer_key = os.getenv("CONSUMER_KEY"),
                  consumer_secret = os.getenv("CONSUMER_SECRET"),
                  access_token_key = os.getenv("ACCESS_TOKEN_KEY"),
                  access_token_secret = os.getenv("ACCESS_TOKEN_SECRET"))

with open("./democrat-primary-candidates-raw.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    output = []
    for row in csv_reader:
        if row["announcement_tweet_id"]:
            announcement_tweet_id = int(row["announcement_tweet_id"].replace("status/", ""))
            tweet = api.GetStatus(announcement_tweet_id)._json

            posts = list(api.GetUserTimeline(screen_name=row["twitter_handle"], since_id=(announcement_tweet_id - 1), trim_user=True, count=200))

            while len(posts) % 200 == 0:
                posts += list(api.GetUserTimeline(screen_name=row["twitter_handle"], since_id=(announcement_tweet_id - 1), max_id = posts[len(posts) - 1]._json['id_str'], trim_user=True, count=200))



            like_counts = []
            total_favorites = 0
            total_retweets = 0
            for post in posts:
                if "retweeted_status" not in post._json: 
                    like_counts.append(post._json["favorite_count"])
                    total_favorites += post._json["favorite_count"]
                    total_retweets += post._json["retweet_count"]

            # Calculate 5 number summary
            like_counts = np.array(like_counts)
            quartiles = np.percentile(like_counts, [25, 50, 75])
            data_min, data_max = like_counts.min(), like_counts.max()

            output.append({
                "candidate": row["candidate"],
                "twitter_handle": row["twitter_handle"],
                "announcement_date": row["announcement_date"],
                "announcement_tweet_id": announcement_tweet_id,
                "hashtags": row["hashtags"],
                "announcement_likes": tweet["favorite_count"],
                "announcement_retweets": tweet["retweet_count"],
                "followers": tweet["user"]["followers_count"],
                "average_post_likes": total_favorites / len(posts),
                "average_post_retweets": total_retweets / len(posts),
                "total_posts": len(posts),
                "likes_min": data_min,
                "likes_q1": quartiles[0],
                "likes_med": quartiles[1],
                "likes_q3": quartiles[2],
                "likes_max": data_max,
            })

    with open("../../data/twitter-primary/democrat-primary-candidates.csv", mode='w') as csv_file:
        fieldnames = ["candidate", "twitter_handle", "announcement_date", "announcement_tweet_id", "hashtags", "followers", "announcement_likes", "announcement_retweets", "average_post_likes", "average_post_retweets",  "total_posts",'likes_q3', 'likes_med', 'likes_max', 'likes_min', 'likes_q1']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        writer.writeheader()
        for row in output:
            writer.writerow(row)
