<?php
/**
 * Clean up the_excerpt()
 */
function roots_excerpt_more()
{
    return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'roots') . '</a>';
}

add_filter('excerpt_more', 'roots_excerpt_more');

/**
 * Manage output of wp_title()
 */
function roots_wp_title($title)
{
    if (is_feed()) {
        return $title;
    }

    $title .= get_bloginfo('name');

    return $title;
}

add_filter('wp_title', 'roots_wp_title', 10);

// add custom class to navigation
add_filter('next_posts_link_attributes', 'posts_link_attributes_1');
add_filter('previous_posts_link_attributes', 'posts_link_attributes_2');

function posts_link_attributes_1()
{
    return 'class="btn-floating left"';
}

function posts_link_attributes_2()
{
    return 'class="btn-floating right"';
}

add_filter('get_avatar_attributes', 'change_avatar_css');

function change_avatar_css($class)
{
    $class = str_replace("class='avatar", "class='circle avatar ", $class);
    return $class;
}

?>

<?php //this function will be called in the next section
function advanced_comment($comment, $args, $depth) {
$GLOBALS['comment'] = $comment; ?>

<li <?php comment_class(); ?> id="li-comment-<?php comment_ID() ?>">
    <div class="comment-author vcard">
        <div class="row">
                <div class="col s12 m12">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                            <div class="col s2">
                <?php echo get_avatar($comment, $size = '48', $default = 'http://www.gravatar.com/avatar/00000000000000000000000000000000'); ?>
                <div class="comment-meta"
                    <a href="<?php the_author_meta('user_url'); ?>"><?php printf(__('%s'), get_comment_author_link()) ?></a>
                </div>

                <small><?php printf(__('%1$s at %2$s'), get_comment_date(), get_comment_time()) ?><?php edit_comment_link(__('(Edit)'), '  ', '') ?></small>
                    </div>

                    <div class="col s10">
                      <span class="black-text">
                              <div class="comment-text">
                                  <?php comment_text() ?>
                              </div>
                      </span>
                    </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <div class="reply">
                            <?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    </div>
    </li>

    <?php if ($comment->comment_approved == '0') : ?>
        <em><?php _e('Your comment is awaiting moderation.') ?></em>
        <br/>
    <?php endif; ?>


    <?php } ?>

    <?php function delete_comment_link($id)
    {
        if (current_user_can('edit_post')) {
            echo '<a class="btn" href="' . admin_url("comment.php?action=cdc&c=$id") . '">del</a> ';
            echo '<a class="btn" href="' . admin_url("comment.php?action=cdc&dt=spam&c=$id") . '">spam</a>';
        }
    }

    ?>

